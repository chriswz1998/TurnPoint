/**
 * Array of available file types for reporting.
 *
 * This array contains a list of objects, each representing a specific file type used in the system. 
 * Each object contains:
 * - `name`: The name of the file type, which is a descriptive label used for display purposes.
 * - `id`: A unique identifier for each file type, which is used to reference or categorize the file type in the system.
 * 
 * The file types represent various reports or documents related to different processes, such as:
 * - Intake Reporting
 * - Flow Through
 * - Loss of Service
 * - Rent Supplement Request
 * - Goals and Progress
 * - Safety Plan
 * - Overdose Safety Plan
 * - Incident Report
 * - Individuals
 * - Shelter Diversion Follow-Up Log
 * - Site List
 *
 * To modify this list:
 * 1. To add a new file type, create a new object with a unique `id` and appropriate `name` and push it into the `filetypes` array.
 * 2. To remove an existing file type, simply remove the corresponding object from the array.
 * 3. To change the name or ID of an existing file type, modify the `name` or `id` of the desired object.
 * 
 * Example of how to add a new file type:
 * {
 *   name: 'New Report Type',
 *   id: '12',
 * }
 */

export const filetypes = [
    {
        name: 'Intake Reporting',
        id: '1',
    },
    {
        name: 'Flow Through',
        id: '2',
    },
    {
        name: 'Loss of Service',
        id: '3',
    },
    {
        name: 'Rent Supplement Request',
        id: '4',
    },
    {
        name: 'Goals and Progress',
        id: '5',
    },
    {
        name: 'Safety Plan',
        id: '6',
    },
    {
        name: 'Overdose Safety Plan',
        id: '7',
    },
    {
        name: 'Incident Report',
        id: '8',
    },
    {
        name: 'Individuals',
        id: '9',
    },
    {
        name: 'Shelter Diversion Follow-Up Log',
        id: '10',
    },
    {
        name: 'Site List',
        id: '11',
    }
]