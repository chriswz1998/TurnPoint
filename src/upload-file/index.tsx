import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { filetypes } from '@/lib/mock.ts';

let fileName: string = '';
let fileNames: string[] = [];

// Define types for each file format
interface Type2Individual {
    Individual: string;
    "Program or Site": string;
    "Start Date": string;
    "Exit Date": string;
    "Exit Reason": string;
}

interface Type3Individual {
    Individual: string;
    "Program or Site": string;
    "Start Date/Time of LOS": string;
    "End Date/Time of LOS": string;
    "Review for TPCS LOS": string; // This column contains Yes or No based on 0 or 1
    "Reason and Rationale for Restriction": string;
    "Was this related to a critical incident": string; // Yes/No
    "Staff Reporting": string;
    "Rationale for LOS > 48 hours": string;
    "Manager Approved": string; // This column contains Yes or No based on 0 or 1
}

interface Type4Individual {
    Individual: string;
    "Program or Site": string;
    Notes: string;
}

interface Type5Individual {
    Individual: string;
    "Program/Residence": string;
    "Goal Title"?: string;
    "Goal Type"?: string;
    "Personal Outcome"?: string;
    "Goal Description"?: string;
    "Start Date"?: string;
    "Completion Date"?: string;
    "Discontinued Date"?: string;
    "Goal Progress"?: string;
}

interface Type6Individual {
    Individual: string;
    "Program or Site": string;
    "Self-soothing strategies": string;
    "Reasons for living": string;
    "Support connections": string;
    "Safe spaces": string;
}

interface Type7Individual {
    Individual: string;
    "Program or Site": string;
    "Staff Member": string;
    "Today's Date": string;
    "Risk Factors": string;
    "Risk Reduction Actions": string;
    "Wellness Habits": string;
    "Support People": string;
    "Crisis Contacts": string;
}

interface Type8Incident {
    "Client(s) involved": string;
    "Program or Site": string;
    "Date and Time of Incident": string;
    "Degree of injury": string;
    "Type of injury": string;
    "Type of serious incident": string;
}

interface Type9Individual {
    "Client Photo": string | null;  // It can store the URL or the file name if managed.
    Person: string;
    "Date of Birth": string;
    Site: string;
    Programs: string;
    "Date entered into the system": string;
}

interface Type10Individual {
    Community: string;
    "Initial follow-up Date": string;
    "Current Goals": string;
    "Current Goals Description": string;
    "Follow-up log": string;
    "Referral log": string;
    "Successful Diversion": string;
    "Diverted To": string;
    "Diversion Method": string;
    "Diversion Cost": string;
    "Eviction Prevention": string;
}

interface ParsedData {
    metadata: Record<string, string>;
    individuals: (Type5Individual | Type2Individual | Type8Incident | Type9Individual | Type3Individual | Type4Individual | Type6Individual | Type7Individual | Type10Individual) [];
}

// Logic to process the Excel file
const processExcelFile = (file: File, fileType: string): Promise<ParsedData> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, {
                defval: "",
                header: 1
            });

            let metadata: Record<string, string> = {};
            let individuals: (Type5Individual | Type2Individual | Type8Incident | Type9Individual | Type3Individual | Type4Individual | Type6Individual | Type7Individual | Type10Individual)[] = [];

            // Function to format Excel dates
            const formatDate = (dateValue: any): string => {
                if (dateValue instanceof Date) {
                    return dateValue.toLocaleDateString("es-ES"); // Date format in Spanish (DD-MM-YYYY)
                } else if (typeof dateValue === "number") {
                    const date = XLSX.SSF.parse_date_code(dateValue);
                    return new Date(date.y, date.m - 1, date.d).toLocaleDateString("es-ES"); // Convert Excel number to date
                }
                return ""; // If it's not a valid date, return empty string
            };

            // Handling Type 5 file logic
            if (fileType === "5") {
                fileName = file.name;
                console.log("Goals And Progress logic will be implemented");

                let currentIndividual: Type5Individual | null = null;
                jsonData.forEach((row, rowIndex) => {
                    // Skip the first row (headers)
                    if (rowIndex === 0 || !Array.isArray(row) || row.length === 0 || row.every((v) => v.trim() === "")) {
                        return;
                    }

                    // Process metadata
                    if (
                        row[0].includes("Turning Points Collaborative Society") ||
                        row[0].includes("Goals & Progress Notes by Individual") ||
                        row[0].includes("Report Period") ||
                        row[0].includes("For: All Individuals") ||
                        row[0].includes("Program(s):")
                    ) {
                        const [key, value] = row[0].split(":");
                        metadata[key.trim()] = value ? value.trim() : "";
                        return;
                    }

                    // Process individual data
                    if (row[0].includes("Individual:")) {
                        if (currentIndividual) {
                            individuals.push(currentIndividual);
                        }
                        currentIndividual = {
                            Individual: jsonData[rowIndex][2]?.trim() || "",
                            "Program/Residence": jsonData[rowIndex][8]?.trim() || ""
                        };
                        return;
                    }

                    // Assign data to the current individual
                    if (currentIndividual) {
                        if (row[0].includes("Goal Title:")) currentIndividual["Goal Title"] = jsonData[rowIndex + 1][0]?.trim() || "";
                        if (row[2]?.includes("Goal Type:")) currentIndividual["Goal Type"] = jsonData[rowIndex + 1][2]?.trim() || "";
                        if (row[3]?.includes("Personal Outcome:")) currentIndividual["Personal Outcome"] = jsonData[rowIndex + 1][3]?.trim() || "";
                        if (row[6]?.includes("Start Date:")) currentIndividual["Start Date"] = jsonData[rowIndex + 1][6]?.trim() || "";
                        if (row[8]?.includes("Completion Date:")) currentIndividual["Completion Date"] = jsonData[rowIndex + 1][8]?.trim() || "";
                        if (row[9]?.includes("Discontinued Date:")) currentIndividual["Discontinued Date"] = jsonData[rowIndex + 1][9]?.trim() || "";
                        if (row[0].includes("Goal Description:")) currentIndividual["Goal Description"] = jsonData[rowIndex][3]?.trim() || "";
                        if (row[3]?.includes("Goal Progress:")) currentIndividual["Goal Progress"] = jsonData[rowIndex][3]?.trim() || "";
                    }
                });

                // Add the last individual to the list
                if (currentIndividual) {
                    individuals.push(currentIndividual);
                }

                // Handling Type 2 file logic
            } else if (fileType === "2") {
                fileName = file.name;
                console.log("Flow Through logic will be implemented");

                jsonData.forEach((row, rowIndex) => {
                    // Skip the first row (headers) and empty rows
                    if (rowIndex === 0 || !Array.isArray(row) || row.length === 0 || row.every((v) => v.trim() === "")) {
                        return;
                    }

                    // Create an object for each individual with data from columns, ensuring valid strings before using .trim()
                    const individual: Type2Individual = {
                        Individual: (typeof row[0] === 'string' ? row[0]?.trim() : "") || "", // Column A
                        "Program or Site": (typeof row[1] === 'string' ? row[1]?.trim() : "") || "", // Column B
                        "Start Date": formatDate(row[2]), // Convert date from Column C
                        "Exit Date": formatDate(row[3]),  // Convert date from Column D
                        "Exit Reason": (typeof row[4] === 'string' ? row[4]?.trim() : "") || "", // Column E
                    };

                    // Add the individual to the list
                    individuals.push(individual);
                });

                // Handling Type 3 file logic
            } else if(fileType === "3") {
                fileName = file.name;
                console.log("Loss Of Service logic will be implemented");

                jsonData.forEach((row, rowIndex) => {
                    if (rowIndex === 0 || !Array.isArray(row) || row.length === 0 || row.every((v) => v.trim() === "")) {
                        return;
                    }

                    // Create an object for each individual, ensuring valid strings before using .trim()
                    const individual: Type3Individual = {
                        Individual: (typeof row[0] === 'string' ? row[0]?.trim() : "") || "", // Column A
                        "Program or Site": (typeof row[1] === 'string' ? row[1]?.trim() : "") || "", // Column B
                        "Start Date/Time of LOS": formatDate(row[2]), // Column C
                        "End Date/Time of LOS": formatDate(row[3]), // Column D
                        "Review for TPCS LOS": (typeof row[4] === 'number' ? (row[4] === 1 ? "Yes" : row[4] === 0 ? "No" : "") : row[4]?.trim()) || "", // Column E (0 or 1 -> Yes or No)
                        "Reason and Rationale for Restriction": (typeof row[5] === 'string' ? row[5]?.trim() : "") || "", // Column F
                        "Was this related to a critical incident": (typeof row[6] === 'string' ? row[6]?.trim() : "") || "", // Column G (Yes or No)
                        "Staff Reporting": (typeof row[7] === 'string' ? row[7]?.trim() : "") || "", // Column H
                        "Rationale for LOS > 48 hours": (typeof row[8] === 'string' ? row[8]?.trim() : "") || "", // Column I
                        "Manager Approved": (typeof row[9] === 'number' ? (row[9] === 1 ? "Yes" : row[9] === 0 ? "No" : "") : row[9]?.trim()) || "", // Column J (0 or 1 -> Yes or No)
                    };

                    // Add the individual to the list
                    individuals.push(individual);
                });

                // Handling Type 4 file logic
            } else if(fileType === "4") {
                fileName = file.name;
                console.log("Rent Supplement Request logic will be implemented");

                jsonData.forEach((row, rowIndex) => {
                    // Skip the first row (headers) and empty rows
                    if (rowIndex === 0 || !Array.isArray(row) || row.length === 0 || row.every((v) => v.trim() === "")) {
                        return;
                    }

                    // Create an object for each individual with the data from the columns, ensuring valid strings before using .trim()
                    const individual: Type4Individual = {
                        Individual: (typeof row[0] === 'string' ? row[0]?.trim() : "") || "", // Column A: Individual
                        "Program or Site": (typeof row[1] === 'string' ? row[1]?.trim() : "") || "", // Column B: Program or Site
                        Notes: (typeof row[2] === 'string' ? row[2]?.trim() : "") || "", // Column C: Notes
                    };

                    // Add the individual object to the list of individuals
                    individuals.push(individual);
                });

                // Handling Type 6 file logic
            } else if(fileType === "6") {
                fileName = file.name;
                console.log("Safety Plan logic will be implemented");

                jsonData.forEach((row, rowIndex) => {
                    // Skip the first row (headers) and empty rows
                    if (rowIndex === 0 || !Array.isArray(row) || row.length === 0 || row.every((v) => v.trim() === "")) {
                        return;
                    }

                    // Create an object for each individual with the data from the columns, ensuring valid strings before using .trim()
                    const individual: Type6Individual = {
                        Individual: (typeof row[0] === 'string' ? row[0]?.trim() : "") || "", // Column A: Individual
                        "Program or Site": (typeof row[1] === 'string' ? row[1]?.trim() : "") || "", // Column B: Program or Site
                        "Self-soothing strategies": (typeof row[2] === 'string' ? row[2]?.trim() : "") || "", // Column C: Self-soothing strategies
                        "Reasons for living": (typeof row[3] === 'string' ? row[3]?.trim() : "") || "", // Column D: Reasons for living
                        "Support connections": (typeof row[4] === 'string' ? row[4]?.trim() : "") || "", // Column E: Support connections
                        "Safe spaces": (typeof row[5] === 'string' ? row[5]?.trim() : "") || "", // Column F: Safe spaces
                    };

                    // Add the individual object to the list of individuals
                    individuals.push(individual);
                });

                // Handling Type 7 file logic
            } else if(fileType === "7") {
                fileName = file.name;
                console.log("Overdose Safety Plan logic will be implemented");

                jsonData.forEach((row, rowIndex) => {
                    // Skip the first row (headers) and empty rows
                    if (rowIndex === 0 || !Array.isArray(row) || row.length === 0 || row.every((v) => v.trim() === "")) {
                        return;
                    }

                    // Create an object for each individual with the data from the columns, ensuring valid strings before using .trim()
                    const individual: Type7Individual = {
                        Individual: (typeof row[0] === "string" ? row[0]?.trim() : "") || "", // Column A: Individual
                        "Program or Site": (typeof row[1] === "string" ? row[1]?.trim() : "") || "", // Column B: Program or Site
                        "Staff Member": (typeof row[2] === "string" ? row[2]?.trim() : "") || "", // Column C: Staff Member(s) completing form
                        "Today's Date": formatDate(row[3]), // Column D: Today's Date
                        "Risk Factors": (typeof row[4] === "string" ? row[4]?.trim() : "") || "", // Column E: Risk Factors
                        "Risk Reduction Actions": (typeof row[5] === "string" ? row[5]?.trim() : "") || "", // Column F: Risk Reduction Actions
                        "Wellness Habits": (typeof row[6] === "string" ? row[6]?.trim() : "") || "", // Column G: Wellness Habits
                        "Support People": (typeof row[7] === "string" ? row[7]?.trim() : "") || "", // Column H: Support People
                        "Crisis Contacts": (typeof row[8] === "string" ? row[8]?.trim() : "") || "", // Column I: Crisis Contacts
                    };

                    // Add the individual object to the list of individuals
                    individuals.push(individual);
                });

                // Handling Type 8 file logic
            } else if(fileType === "8") {
                fileName = file.name;
                console.log("Incident Report logic will be implemented");

                jsonData.forEach((row, rowIndex) => {
                    // Skip the first row (headers) and empty rows
                    if (rowIndex === 0 || !Array.isArray(row) || row.length === 0 || row.every((v) => v.trim() === "")) {
                        return;
                    }

                    // Create an object for each incident with data from the columns, ensuring valid strings before using .trim()
                    const incident: Type8Incident = {
                        "Client(s) involved": (typeof row[0] === 'string' ? row[0]?.trim() : "") || "", // Column A: Client(s) involved
                        "Program or Site": (typeof row[1] === 'string' ? row[1]?.trim() : "") || "", // Column B: Program or Site
                        "Date and Time of Incident": formatDate(row[2]), // Convert date from Column C: Date and Time of Incident
                        "Degree of injury": (typeof row[3] === 'string' ? row[3]?.trim() : "") || "", // Column D: Degree of injury
                        "Type of injury": (typeof row[4] === 'string' ? row[4]?.trim() : "") || "", // Column E: Type of injury
                        "Type of serious incident": (typeof row[5] === 'string' ? row[5]?.trim() : "") || "", // Column F: Type of serious incident
                    };

                    // Add the incident to the list of individuals
                    individuals.push(incident);
                });

                // Handling Type 9 file logic
            } else if(fileType === "9") {
                fileName = file.name;
                console.log("Individuals Report logic will be implemented");

                jsonData.forEach((row, rowIndex) => {
                    if (rowIndex === 0 || !Array.isArray(row) || row.length === 0 || row.every((v) => v.trim() === "")) {
                        return;
                    }

                    const individual: Type9Individual = {
                        "Client Photo": row[0]?.trim() || null,  // Here you can manage the image as needed
                        Person: row[1]?.trim() || "",
                        "Date of Birth": formatDate(row[2]),  // Use the formatDate function for dates
                        Site: row[3]?.trim() || "",
                        Programs: row[4]?.trim() || "",
                        "Date entered into the system": formatDate(row[5]),
                    };

                    individuals.push(individual);
                });

                // Handling Type 10 file logic
            } else if(fileType === "10") {
                fileName = file.name;
                console.log("Shelter Diversion Follow-Up logic will be implemented");

                jsonData.forEach((row, rowIndex) => {
                    // Skip the first row (headers) and empty rows
                    if (rowIndex === 0 || !Array.isArray(row) || row.length === 0 || row.every((v) => v.trim() === "")) {
                        return;
                    }

                    // Create an object for each individual with the data from the columns, ensuring valid strings before using .trim()
                    const individual: Type10Individual = {
                        Community: (typeof row[0] === "string" ? row[0]?.trim() : "") || "", // Column A: Community
                        "Initial follow-up Date": formatDate(row[1]), // Column B: Initial follow-up Date
                        "Current Goals": (typeof row[2] === "string" ? row[2]?.trim() : "") || "", // Column C: Current Goals
                        "Current Goals Description": (typeof row[3] === "string" ? row[3]?.trim() : "") || "", // Column D: Current Goals Description
                        "Follow-up log": (typeof row[4] === "string" ? row[4]?.trim() : "") || "", // Column E: Follow-up log
                        "Referral log": (typeof row[5] === "string" ? row[5]?.trim() : "") || "", // Column F: Referral log
                        "Successful Diversion": (typeof row[6] === "string" ? row[6]?.trim() : "") || "", // Column G: Successful Diversion
                        "Diverted To": (typeof row[7] === "string" ? row[7]?.trim() : "") || "", // Column H: Diverted To
                        "Diversion Method": (typeof row[8] === "string" ? row[8]?.trim() : "") || "", // Column I: Diversion Method
                        "Diversion Cost": (typeof row[9] === "string" ? row[9]?.trim() : "") || "", // Column J: Diversion Cost
                        "Eviction Prevention": (typeof row[10] === "string" ? row[10]?.trim() : "") || "", // Column K: Eviction Prevention
                    };

                    // Add the individual object to the list of individuals
                    individuals.push(individual);
                });

            } else {
                // Other logics for other file types (type 1, 3, 4, etc.)
                console.log("No logic will be implemented for this file type.");
            }

            resolve({ metadata, individuals });
        };

        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};

// File upload component
const Index = () => {
    const [upload, setUpload] = useState<{
        filename?: string | null;
        file?: File | null;
        filetype?: string | null;
        records?: ParsedData | null;
    }>({
        filename: null,
        file: null,
        filetype: null,
        records: null
    });

    // Handle file selection
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUpload((prev) => ({
            ...prev,
            filename: file.name,
            file: file,
            records: null
        }));
    };

    // Handle file type change
    const handleFileTypeChange = async (value: string) => {
        setUpload((prev) => {
            if (prev.file) {
                processExcelFile(prev.file, value)
                    .then((parsedData) => {
                        setUpload({ ...prev, filetype: value, records: parsedData });
                    })
                    .catch((error) => console.error("Error parsing file:", error));
            }
            return { ...prev, filetype: value };
        });
    };

    // Handle file upload button click
    const upload_file = async () => {
        try {
            console.log(upload);
            JSON.stringify(upload)
            fileNames.push(fileName);
            console.log("fileName:", fileNames[fileNames.length- 1]);
            window.alert("File uploaded successfully!");
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        }
    };

    return (
        <div className="grid w-full max-w-sm items-center gap-4">
            <label htmlFor="file-upload" className="cursor-pointer border border-input px-3 py-2 rounded-md shadow-sm text-center text-black">
                {upload.filename ? upload.filename : "Choose File"}
            </label>
            <input
                id="file-upload"
                type="file"
                accept=".xlsx, .xls"
                className="hidden"
                onChange={handleFileUpload}
            />

            <Select onValueChange={handleFileTypeChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select file type"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Types</SelectLabel>
                        {filetypes.map(type => (
                            <SelectItem key={type.id} value={type.id} className='text-black'>
                                {type.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button
                onClick={upload_file}
                className="bg-[#3e56b0] text-white hover:bg-[#4f6bcd] rounded-md px-4 py-2"
            >
                Upload
            </Button>
        </div>
    );
};

export { fileNames };
export default Index;