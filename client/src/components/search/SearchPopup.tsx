import { useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Spinner from "../loading/Spinner.tsx";

const SearchPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<
    { _id: string; username: string; profileImage: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signup");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PRODUCTION_URL || "http://localhost:5000"}/api/v1/search`,
        { username: query },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResults(response.data || []);
    } catch (error: any) {
      console.error("Error during search:", error);
      setError(
        error?.response?.data?.message || "An error occurred during the search."
      );
      toast.error(
        error?.response?.data?.message || "An error occurred during the search."
      );
    } finally {
      setLoading(false);
    }
  };

  const debounceSearch = (query: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      if (query.trim()) handleSearch(query);
      else setResults([]);
    }, 300);
  };

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setSearchQuery("");
    setResults([]);
    setError(null);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <>
      {/* Search Button */}
      <button
        onClick={openModal}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Open search popup"
      >
        <FiSearch size={18} />
        <span className="text-xs hidden md:block">Search by username</span>
      </button>

      {/* Search Dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={closeModal}
          initialFocus={inputRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* Search Input */}
                  <div className="flex items-center border-b border-gray-300 pb-2">
                    <FiSearch size={20} className="text-gray-500" />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Type to search..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        debounceSearch(e.target.value);
                      }}
                      className="w-full px-2 py-1 text-sm focus:outline-none"
                      aria-label="Search input"
                    />
                  </div>

                  {/* Results */}
                  <div className="mt-4">
                    {loading ? (
                      <Spinner />
                    ) : error ? (
                      <p className="text-sm text-red-500">{error}</p>
                    ) : results.length > 0 ? (
                      <ul className="space-y-2">
                        {results.map((result) => (
                          <li
                            key={result._id}
                            className="flex items-center gap-2 p-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                              alert(`You selected: ${result.username}`);
                              closeModal();
                            }}
                          >
                            <img
                              src={result.profileImage}
                              alt={result.username}
                              className="w-8 h-8 rounded-full"
                            />
                            <span>{result.username}</span>
                          </li>
                        ))}
                      </ul>
                    ) : searchQuery.trim() ? (
                      <p className="text-sm text-gray-500">
                        No results found for "{searchQuery}".
                      </p>
                    ) : null}
                  </div>
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    aria-label="Close search popup"
                  >
                    &times;
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SearchPopup;