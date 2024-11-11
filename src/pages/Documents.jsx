import React, { useState } from "react";
import { FaCalendarAlt, FaFileAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Sample list of documents that students can request
const documentList = [
  { id: 1, name: "Official Transcript", file: false },
  { id: 2, name: "Letter of Recommendation", file: false },
  { id: 3, name: "Certificate of Enrollment", file: false },
  { id: 4, name: "Degree Certificate", file: true },
  { id: 5, name: "Student ID Card", file: true },
];

// Sample list of reasons why students might request a document
const documentMotifs = [
  { id: 1, reason: "Applying for a job" },
  { id: 2, reason: "Applying for a scholarship" },
  { id: 3, reason: "Visa application" },
  { id: 4, reason: "Personal records" },
  { id: 5, reason: "Further studies" },
  { id: 6, reason: "Other" },
];
// Status for requests
const statusOptions = [
  { id: "pending", label: "Pending", color: "text-yellow-500" },
  { id: "processed", label: "Processed", color: "text-green-500" },
  { id: "rejected", label: "Rejected", color: "text-red-500" },
];

const DocumentRequest = () => {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [requestHistory, setRequestHistory] = useState([]);
  const [selectedMotif, setSelectedMotif] = useState("");
  const [otherMotif, setOtherMotif] = useState("");

  const handleRequestSubmit = () => {
    // Simulate adding a request to history
    const newRequest = {
      id: requestHistory.length + 1,
      document: selectedDocument,
      motif: selectedMotif,
      otherMotif: otherMotif || '',
      date: Date.now(),
      status: "pending", // Initial status is "pending"
    };

    setRequestHistory([newRequest, ...requestHistory]);
    setSelectedDocument("");
    setRequestDate("");
    setSelectedMotif("")
    setOtherMotif("")
  };
  const handleMotifChange = (e) => {
    setSelectedMotif(e.target.value);
  }

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg space-y-6 min-h-screen">
      {/* Title */}
      <h2 className="text-2xl w-full font-semibold text-black dark:text-[#96C9F4] mb-6">Request a Document</h2>

      {/* Document Request Form */}
      <div className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="document" className="text-lg text-black dark:text-white mb-2">
            Select Document
          </label>
          <select
            id="document"
            value={selectedDocument}
            onChange={(e) => setSelectedDocument(e.target.value)}
            className="p-3  text-foreground rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#3FA2F6]">
            <option value="" disabled>Select a document</option>
            {documentList.map((doc) => (
              <option key={doc.id} value={doc.name}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="text-lg text-black dark:text-white mb-2">
            Enter your motif
          </label>
          <select onChange={handleMotifChange} className="flex items-center  text-foreground p-3 rounded-md shadow-md">
            <option value="" className="cursor-not-allowed " disabled>Select a motif</option>
            {documentMotifs.map((motif) => (
              <option key={motif.id} value={motif.reason}>
                {motif.reason}
              </option>
            ))}
          </select>
        </div>
        {selectedMotif === "Other" && (
          <div>
            <h1 className="text-lg text-foreground">If other :</h1>
            <textarea
              onChange={(e) => setOtherMotif(e.target.value)}
              rows={3}
              placeholder="Enter your motif"
              className="p-3  placeholder:text-foreground text-foreground rounded-md w-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#3FA2F6]">
            </textarea>
          </div>
        )}
        <div className="">
          {selectedDocument && documentList.find(el => el.name === selectedDocument).file && (
            <>
              <h1 className="text-lg mb-2">Add files</h1>
              <input type="file" multiple className="p-3  w-full text-foreground rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#3FA2F6]" />
            </>
          )}
        </div>

        <button
          onClick={handleRequestSubmit}
          className="w-full py-2 text-white bg-[#3FA2F6] hover:bg-[#0F67B1] rounded-lg focus:outline-none transition duration-200 ease-in-out"
          disabled={!selectedDocument || !selectedMotif}
        >
          Submit Request
        </button>
      </div>
      <div className="mt-8 ">
        <h3 className="text-2xl font-semibold text-black dark:text-[#96C9F4] ">Request History</h3>
        <div className="space-y-4 mt-4">
          {requestHistory.length > 0 ? (
            requestHistory.map((request) => (
              <div
                key={request.id}
                className=" p-4 rounded-lg shadow-md flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="sm:text-lg text-black dark:text-white font-semibold">{request.document}</span>
                  {request.motif && (

                    <span className="text-sm text-gray-400">Motif : {request.motif}</span>
                  )}
                  {request.otherMotif && (

                    <span className="text-sm text-gray-400">Motif description : {request.otherMotif}</span>
                  )}
                  <span className="text-sm text-gray-400">Requested on: {new Date(request.date).toLocaleDateString()}</span>
                </div>
                <span className={`text-sm ${statusOptions.find(status => status.id === request.status).color}`}>
                  {statusOptions.find(status => status.id === request.status).label}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No requests yet. Submit your first document request!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentRequest;