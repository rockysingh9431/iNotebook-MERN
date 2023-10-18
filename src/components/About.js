import React from 'react';

const About = () => {
  return (
    <div className="container my-4">
      <h2>About Us</h2>
      <p>
        Welcome to iNotebook, a modern note-taking application designed to streamline your organization and productivity.
      </p>
      <p>
        Our platform is built with simplicity and efficiency in mind. Whether you're a student, a professional, or simply someone who loves to stay organized, iNotebook is here to enhance your note-taking experience.
      </p>
      <h3>Key Features:</h3>
      <ul>
        <li>Intuitive User Interface: Our user-friendly interface allows you to create, edit, and manage notes with ease.</li>
        <li>Tagging System: Categorize your notes with custom tags for easy retrieval and organization.</li>
        {/* <li>Search Functionality: Quickly find specific notes using our powerful search feature.</li> */}
        <li>Responsive Design: Access your notes on various devices, including desktops, tablets, and mobile phones.</li>
        <li>Secure and Private: Your data is encrypted and protected, ensuring your notes remain confidential.</li>
      </ul>
      <h3>Get Started:</h3>
      <p>
        Sign up today to start taking advantage of the powerful features iNotebook has to offer. Whether you're managing projects, studying for exams, or jotting down creative ideas, we've got you covered.
      </p>
      <p>
        Join our community and elevate your note-taking experience with iNotebook!
      </p>
    </div>
  );
}

export default About;
