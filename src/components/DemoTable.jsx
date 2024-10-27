import { useState, useEffect } from "react";

// 더미 데이터 예시
const initialData = [
  { id: 1, name: "John", age: 28, job: "Developer" },
  { id: 2, name: "Anna", age: 22, job: "Designer" },
  { id: 3, name: "Mike", age: 35, job: "Manager" },
  { id: 4, name: "Laura", age: 31, job: "Product Owner" },
  { id: 5, name: "David", age: 40, job: "CTO" },
  { id: 6, name: "Sophie", age: 25, job: "Developer" },
  { id: 7, name: "Jack", age: 50, job: "Manager" },
  { id: 8, name: "Lucy", age: 30, job: "Designer" },
  { id: 9, name: "Mark", age: 45, job: "Architect" },
  { id: 10, name: "Eva", age: 27, job: "Product Manager" },
];

const DemoTable = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [newItem, setNewItem] = useState({ name: "", age: "", job: "" });

  // 필터 기능 (검색어에 따라 데이터 필터링)
  useEffect(() => {
    const lowerCasedSearchTerm = searchTerm.toLowerCase();
    setFilteredData(
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerCasedSearchTerm) ||
          item.job.toLowerCase().includes(lowerCasedSearchTerm) ||
          item.age.toString().includes(lowerCasedSearchTerm)
      )
    );
  }, [searchTerm, data]);

  // 정렬 기능
  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(sortedData);
    setSortConfig({ key, direction });
  };

  // 페이지네이션에 따른 데이터 분할
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // CRUD 기능
  const handleAdd = () => {
    const id = data.length + 1;
    const newEntry = { id, ...newItem };
    setData([...data, newEntry]);
    setNewItem({ name: "", age: "", job: "" });
  };

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // 스타일링
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      maxWidth: "900px",
      margin: "0 auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
    },
    th: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "8px",
      cursor: "pointer",
    },
    td: {
      padding: "8px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
    paginationButton: {
      padding: "8px 16px",
      backgroundColor: "#f1f1f1",
      border: "1px solid #ddd",
      cursor: "pointer",
      fontSize: "16px",
    },
    paginationActive: {
      padding: "8px 16px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "1px solid #4CAF50",
      fontWeight: "bold",
    },
    input: {
      padding: "8px",
      margin: "10px 0",
      width: "100%",
      maxWidth: "300px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "4px",
      marginTop: "10px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "300px",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h1>React Table Demo</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />

      {/* <div style={styles.form}>
        <h3>Add New Entry</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newItem.name}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={newItem.age}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="job"
          placeholder="Job"
          value={newItem.job}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.button}>
          Add
        </button>
      </div> */}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th} onClick={() => sortData("id")}>
              ID
            </th>
            <th style={styles.th} onClick={() => sortData("name")}>
              Name
            </th>
            <th style={styles.th} onClick={() => sortData("age")}>
              Age
            </th>
            <th style={styles.th} onClick={() => sortData("job")}>
              Job
            </th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td style={styles.td}>{item.id}</td>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.age}</td>
              <td style={styles.td}>{item.job}</td>
              <td style={styles.td}>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={styles.button}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button
          style={styles.paginationButton}
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          style={styles.paginationButton}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              style={
                currentPage === pageNumber
                  ? styles.paginationActive
                  : styles.paginationButton
              }
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          style={styles.paginationButton}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          style={styles.paginationButton}
          onClick={() => paginate(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default DemoTable;
