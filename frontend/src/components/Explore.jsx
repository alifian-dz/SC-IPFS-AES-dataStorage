import { useState, useEffect } from "react";
import { getFiles } from "../utils/getFiles";

const Explore = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const data = await getFiles();
      setFiles(data);
    };
    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Riwayat Penyimpanan</h2>
      {files.length === 0 ? (
        <p>Belum ada file yang diunggah.</p>
      ) : (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <p>
                <strong>CID:</strong> {file.cid}
              </p>
              <p>
                <strong>Waktu Unggah:</strong> {file.timestamp}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Explore;
