import { useState } from "react";

export const fetchApplications = async () => {
  const apiUrl = "https://staging.iskibris.com/api/applications/test?page=1"; // API endpoint
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); // Parse the full JSON response
    return result.data; // Assuming the applications are in the `data` field of the response
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

const useFetchNextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const fetchNextPage = async () => {
    if (totalPages !== null && currentPage >= totalPages) {
      console.log("No more pages to fetch");
      return;
    }

    const response = await fetch(
      `https://staging.iskibris.com/api/applications/test?page=${
        currentPage + 1
      }`
    );
    const result = await response.json();

    if (result) {
      setCurrentPage((prevPage) => prevPage + 1);
      setTotalPages(result.last_page);
      return result.data;
    }
  };

  return { fetchNextPage, currentPage, totalPages };
};

export default useFetchNextPage;
