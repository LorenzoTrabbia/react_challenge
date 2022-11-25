import { useEffect, useState } from "react";
import "./App.css";

// Type for the row object
type RowType = {
    operator: "+" | "-";
    value: number;
    disabled: boolean;
};

function App() {
    const [rows, setRow] = useState<RowType[]>([]);
    const [result, setResult] = useState<number>(0);

    // Function to update the result
    useEffect(() => {
        setResult(
            rows.reduce((acc, row) => {
                if (!row.disabled) {
                    return row.operator === "+"
                        ? acc + +row.value
                        : acc - +row.value;
                }
                return acc;
            }, 0)
        );
    }, [rows]);

    // Function to add a new row
    const handleAddRow = () => {
        setRow([...rows, { operator: "+", value: 0, disabled: false }]);
    };

    // Function to remove a row
    const handleRemoveRow = (index: number) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRow(newRows);
    };

    // Function to update the operator of a specific row
    const handleOperatorChange = (index: number, operator: "+" | "-") => {
        const newRows = [...rows];
        newRows[index].operator = operator;
        setRow(newRows);
    };

    // Function to update the value of a specific row
    const handleValueChange = (index: number, value: number) => {
        const newRows = [...rows];
        newRows[index].value = value;
        setRow(newRows);
    };

    // Function to update the disabled state of a specific row
    const handleDisabledChange = (index: number) => {
        const newRows = [...rows];
        newRows[index].disabled = newRows[index].disabled ? false : true;
        setRow(newRows);
    };

    return (
        <>
            <h1 className="h1">React challenge - Lorenzo Trabbia</h1>
            <div>
                <button onClick={handleAddRow} className="button-add">
                    Add row
                </button>
            </div>
            <ul>
                {rows.map((row, index) => (
                    <li key={index}>
                        <select
                            className="select"
                            defaultValue={row.operator}
                            onChange={(e: any) =>
                                handleOperatorChange(index, e.target.value)
                            }
                        >
                            <option>+</option>
                            <option>-</option>
                        </select>
                        <input
                            type="number"
                            className="input"
                            value={row.value === 0 ? "" : row.value}
                            onChange={(e: any) =>
                                handleValueChange(index, e.target.value)
                            }
                        />
                        <button
                            onClick={() => handleRemoveRow(index)}
                            className="button-delete"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => handleDisabledChange(index)}
                            className={
                                row.disabled
                                    ? "button-enable"
                                    : "button-disable"
                            }
                        >
                            {row.disabled ? "Enable" : "Disable"}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="result-container">Result: {result}</div>
        </>
    );
}

export default App;
