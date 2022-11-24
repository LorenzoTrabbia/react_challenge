import { useEffect, useState } from "react";
import "./App.css";

type RowType = {
    operator: "+" | "-";
    value: number;
    disabled: boolean;
};

function App() {
    const [rows, setRow] = useState<RowType[]>([]);
    const [result, setResult] = useState<number>(0);

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

    const handleAddRow = () => {
        setRow([...rows, { operator: "+", value: 0, disabled: false }]);
    };

    const handleRemoveRow = (index: number) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRow(newRows);
    };

    const handleOperatorChange = (index: number, operator: "+" | "-") => {
        const newRows = [...rows];
        newRows[index].operator = operator;
        setRow(newRows);
    };

    const handleValueChange = (index: number, value: number) => {
        const newRows = [...rows];
        newRows[index].value = value;
        setRow(newRows);
    };

    const handleDisabledChange = (index: number) => {
        const newRows = [...rows];
        newRows[index].disabled = newRows[index].disabled ? false : true;
        setRow(newRows);
    };

    return (
        <>
            <div>
                <button onClick={handleAddRow}>Add row</button>
            </div>
            <ul>
                {rows.map((row, index) => (
                    <li key={index}>
                        <select
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
                            defaultValue={row.value}
                            onChange={(e: any) =>
                                handleValueChange(index, e.target.value)
                            }
                        />
                        <button onClick={() => handleRemoveRow(index)}>
                            Delete
                        </button>
                        <button onClick={() => handleDisabledChange(index)}>
                            {row.disabled ? "Enable" : "Disable"}
                        </button>
                    </li>
                ))}
            </ul>
            <div>Result: {result}</div>
        </>
    );
}

export default App;
