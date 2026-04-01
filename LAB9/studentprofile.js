import React from "react";

function StudentProfile() {

  // Student details (JavaScript variables)
  const name = "Hema Sri";
  const department = "Computer Science Engineering";
  const year = "3rd Year";
  const section = "B1";

  return (
    <div style={styles.container}>
      <h2>🎓 Student Profile</h2>

      <p><b>Name:</b> {name}</p>
      <p><b>Department:</b> {department}</p>
      <p><b>Year:</b> {year}</p>
      <p><b>Section:</b> {section}</p>
    </div>
  );
}

// Simple styling
const styles = {
  container: {
    border: "2px solid #007bff",
    padding: "20px",
    width: "300px",
    margin: "50px auto",
    borderRadius: "10px",
    backgroundColor: "#f0f8ff",
    textAlign: "center"
  }
};

export default StudentProfile;
