import { useState } from "react";

function UploadCSV() {
  const [employeeFile, setEmployeeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setEmployeeFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!employeeFile) return alert("Please select an employee CSV file!");

    setLoading(true);
    const formData = new FormData();
    formData.append("employees", employeeFile);

    try {
      const response = await fetch("/api/secret-santa/assign", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "secret_santa.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert("Failed to assign Secret Santa.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🎅 Secret Santa Generator
        </h2>

        {/* Employee CSV Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Upload Employees CSV
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload & Generate CSV"}
        </button>
      </div>
    </div>
  );
}

export default UploadCSV;
