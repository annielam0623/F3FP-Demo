import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleSpellClick = (index) => {
    navigate(`/result/${index}`);
  };

  useEffect(() => {
    if (searchText) {
      axios
        .get(`https://www.dnd5eapi.co/api/spells?name=${searchText}`)
        .then((res) => {
          const spellResults = res.data.results;
          // Fetch the full details for each spell
          const spellPromises = spellResults.map((spell) =>
            axios.get(`https://www.dnd5eapi.co${spell.url}`)
          );
          Promise.all(spellPromises)
            .then((spellResponses) => {
              const spellsWithDetails = spellResponses.map(
                (response) => response.data
              );
              setSearchResults(spellsWithDetails);
            })
            .catch((error) => {
              console.error(
                "Error occurred while fetching spell details:",
                error
              );
              setSearchResults([]);
            });
        })
        .catch((error) => {
          console.error("Error occurred during search:", error);
          setSearchResults([]);
        });
    }
  }, [searchText]);

  return (
    <div>
      <h1>Search Page</h1>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {searchResults.map((result) => (
          <li key={result.index}>
            <Link
              to={`/result/${result.index}`}
              onClick={() => handleSpellClick(result.index)}
            >
              {result.name}
            </Link>
            {result.desc && result.desc.length > 0 && (
              <div>
                {result.desc.map((desc, index) => (
                  <p key={index}>{desc}</p>
                ))}
              </div>
            )}
            <p>Index: {result.index}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// import React, { useState } from "react";
// import SearchBar from "./SearchBar";

// export default function SearchPage() {
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async (searchText) => {
//     const results = await performSearch(searchText);
//     setSearchResults(results);
//   };

//   const performSearch = async (searchText) => {
//     try {
//       const response = await fetch();
//       const data = await response.json();

//       const results = data.results.map((result) => ({
//         id: result.id,
//         name: result.name,
//         keywords: result.keywords,
//       }));

//       return results.filter(
//         (result) =>
//           result.name.toLowerCase().includes(searchText.toLowerCase()) ||
//           result.keywords.some((keyword) =>
//             keyword.toLowerCase().includes(searchText.toLowerCase())
//           )
//       );
//     } catch (error) {
//       console.error("Error occurred during search:", error);
//       return [];
//     }
//   };

//   return (
//     <div>
//       <h1>Search Page</h1>
//       <SearchBar onSearch={handleSearch} />
//       <ul>
//         {searchResults.map((result) => (
//           <li key={result.id}>{result.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
