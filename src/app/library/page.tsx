import LibraryClient from "./LibraryClient";

// Library uses hardcoded Google Drive links (not from Sanity)
const semesters = [
  {
    _id: "1",
    name: "Semester 1",
    number: 1,
    driveLink:
      "https://drive.google.com/drive/folders/0B3Ymcwwizgl_WG12bWhYMkhrLWc?resourcekey=0-DEMJ__ad6_HnVcySTQQhGw",
    subjects: [
      { name: "C-Programming" },
      { name: "Engineering Drawing I" },
      { name: "Engineering Mathematics I" },
      { name: "Engineering Mechanics I" },
      { name: "Engineering Physics" },
      { name: "Basic Electrical Engineering" },
      { name: "Fundamentals of Electrical Engineering" },
      { name: "Fundamentals of Electronics Engineering" },
      { name: "Computer Programming" },
      { name: "Applied Mechanics" },
    ],
  },
  {
    _id: "2",
    name: "Semester 2",
    number: 2,
    driveLink:
      "https://drive.google.com/drive/folders/0B3Ymcwwizgl_SXNxc2VYRUtKb0U?resourcekey=0-WUd9HZw-NrI_IfdaSib7Rw",
    subjects: [
      { name: "Engineering Chemistry" },
      { name: "Engineering Mathematics II" },
      { name: "Engineering Mechanics II" },
      { name: "Engineering Thermodynamics I" },
      { name: "Engineering Workshop" },
      { name: "Machine Drawing" },
      { name: "Basic Electronics Engineering" },
      { name: "Engineering Drawing II" },
      { name: "Thermodynamics and Heat Transfer" },
      { name: "Workshop Technology" },
    ],
  },
  {
    _id: "3",
    name: "Semester 3",
    number: 3,
    driveLink:
      "https://drive.google.com/drive/folders/0B3Ymcwwizgl_OWxDMUk1MkRLTWs?resourcekey=0-zt4KoBDgCb4ulQ_beX0WNA",
    subjects: [
      { name: "Applied Thermodynamics" },
      { name: "Engineering Mathematics III" },
      { name: "Industrial Management" },
      { name: "Manufacturing and Production Processes" },
      { name: "Material Science" },
      { name: "Strength of Material" },
      { name: "Computer Aided Drawing (CAD)" },
      { name: "Economics" },
      { name: "Fluid Mechanics and Machines" },
      { name: "Manufacturing Technology" },
      { name: "Material Science and Metallurgy" },
      { name: "Work Study and Ergonomics" },
    ],
  },
  {
    _id: "4",
    name: "Semester 4",
    number: 4,
    driveLink:
      "https://drive.google.com/drive/folders/0B3Ymcwwizgl_QjVvamUxUEw0Tkk?resourcekey=0-Z-Mf98rQEibEh5WGTApAiA",
    subjects: [
      { name: "Electrical Machines" },
      { name: "Fluid Mechanics and Machines" },
      { name: "Group Work and Presentation" },
      { name: "Industrial Economics" },
      { name: "Metrology and Instrumentation" },
      { name: "Numerical Methods" },
      { name: "Work Study and Human Factor Engineering" },
      { name: "Engineering Economics" },
      { name: "Heat and Mass Transfer" },
      { name: "Probability and Statistics" },
      { name: "Production Technology" },
      { name: "Strength of Materials" },
    ],
  },
  {
    _id: "5",
    name: "Semester 5",
    number: 5,
    driveLink:
      "https://drive.google.com/drive/folders/0B3Ymcwwizgl_NjBXNG5LVVlDWDg?resourcekey=0-GAxOs7PxLDHFO_CRSCoL-A",
    subjects: [
      { name: "Energy Audit" },
      { name: "Energy, Power and Technology" },
      { name: "Hydraulic and Pneumatic Controls" },
      { name: "Metrology and Measurement" },
      { name: "Numerical Method" },
      { name: "Project Management" },
      { name: "Supply Chain Management" },
    ],
  },
  {
    _id: "6",
    name: "Semester 6",
    number: 6,
    driveLink:
      "https://drive.google.com/drive/folders/0B3Ymcwwizgl_bDZ0WVlYdFB5bmM?resourcekey=0-bEnX5EzytMvKV4FcSqmPZw",
    subjects: [
      { name: "Communication English" },
      { name: "Concurrent Engineering and Value Engineering" },
      { name: "Design of Machine Element" },
      { name: "Entrepreneurship Development" },
      { name: "Human Resource Management" },
      { name: "Maintenance Engineering" },
      { name: "New Product Development" },
      { name: "Theory of Machine" },
    ],
  },
  {
    _id: "7",
    name: "Semester 7",
    number: 7,
    driveLink:
      "https://drive.google.com/drive/folders/0B3Ymcwwizgl_UUJOVUp6UjZaSUU?resourcekey=0-vFFaok-joPHgMWWVIoTdxw",
    subjects: [
      { name: "Automobile Engineering" },
      { name: "Engineering Ethics and Industrial Law" },
      { name: "Operation Research" },
      { name: "Plant Layout Design and Operations Health and Safety" },
      { name: "Quality Management" },
      { name: "Refrigeration and HVAC System Design" },
    ],
  },
  {
    _id: "8",
    name: "Semester 8",
    number: 8,
    driveLink:
      "https://drive.google.com/drive/folders/0B3Ymcwwizgl_TkUzZ1pKM0NfV1k?resourcekey=0-QKphi6R2YEDOAdVCb7nDSA",
    subjects: [
      { name: "OJT Report" },
      { name: "Seminar Reports" },
      { name: "Final Year Project" },
    ],
  },
];

export default function LibraryPage() {
  return <LibraryClient semesters={semesters} />;
}
