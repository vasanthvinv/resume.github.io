import React, { ChangeEvent, useReducer } from "react";
import "./App.css";

interface dataType {
  Id: number;
  Name: string;
  Link: string;
  MaxInTake: string;
  ShouldCook: string;
  Description: string;
  Nutrition: readonly string[];
}
const data: dataType = {
  Id: 1,
  Name: "",
  Description: "",
  Link: "",
  ShouldCook: "",
  MaxInTake: "",
  Nutrition: [],
};

const NutritionData: readonly string[] = [
  "Vitamin A",
  "Vitamin B",
  "Vitamin C",
  "Vitamin D",
  "Vitamin E",
];

const ActionTypes = {
  SET_FORM_DATA: "SET_FORM_DATA",
  TOGGLE_NUTRITION: "TOGGLE_NUTRITION",
  TOGGLE_NUTRITION_OPEN: "TOGGLE_NUTRITION_OPEN",
  TOGGLE_DETAILS: "TOGGLE_DETAILS",
  TOGGLE_CHECKBOX: "TOGGLE_CHECKBOX",
  DELETE_ITEM: "DELETE_ITEM",
  ADD_ITEM: "ADD_ITEM",
  DELETE_ALL: "DELETE_ALL",
  LOG_INPUT_DATA: "LOG_INPUT_DATA",
};

interface State {
  data: dataType[];
  inputData: dataType[];
  formData: dataType;
  isNutritionOpen: boolean;
  clickedNutritions: readonly string[];
  isOpenDetails: boolean;
  checkedIndices: number[];
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  inputData: [],
  formData: data,
  isNutritionOpen: false,
  clickedNutritions: [],
  isOpenDetails: false,
  checkedIndices: [],
  data: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_FORM_DATA:
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case ActionTypes.TOGGLE_NUTRITION:
      return {
        ...state,
        clickedNutritions: state.clickedNutritions.includes(action.payload)
          ? state.clickedNutritions.filter((n) => n !== action.payload)
          : [...state.clickedNutritions, action.payload],
      };
    case ActionTypes.TOGGLE_NUTRITION_OPEN:
      return { ...state, isNutritionOpen: !state.isNutritionOpen };
    case ActionTypes.TOGGLE_DETAILS:
      return { ...state, isOpenDetails: !state.isOpenDetails };
    case ActionTypes.TOGGLE_CHECKBOX:
      return {
        ...state,
        checkedIndices: state.checkedIndices.includes(action.payload)
          ? state.checkedIndices.filter((i) => i !== action.payload)
          : [...state.checkedIndices, action.payload],
      };
    case ActionTypes.DELETE_ITEM:
      return {
        ...state,
        inputData: state.inputData.filter((item) => item !== action.payload),
      };
    case ActionTypes.ADD_ITEM:
      return {
        ...state,
        inputData: [
          ...state.inputData,
          { ...state.formData, Nutrition: state.clickedNutritions },
        ],
        formData: { ...data, Id: state.formData.Id + 1 },
        clickedNutritions: [],
        isNutritionOpen: false,
      };
    case ActionTypes.DELETE_ALL:
      return {
        ...state,
        inputData: state.inputData.filter(
          (_, index) => !state.checkedIndices.includes(index)
        ),
        checkedIndices: [],
      };
    case ActionTypes.LOG_INPUT_DATA:
      console.log(state.inputData);
      return state;
    default:
      return state;
  }
};

function TaskManager() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    dispatch({ type: ActionTypes.SET_FORM_DATA, payload: { [name]: value } });
  };

  const handleCheckboxChange = (index: number) => {
    dispatch({ type: ActionTypes.TOGGLE_CHECKBOX, payload: index });
  };

  const handleDelete = (id: dataType): void => {
    dispatch({ type: ActionTypes.DELETE_ITEM, payload: id });
  };

  const handleSubmit = (): void => {
    dispatch({ type: ActionTypes.ADD_ITEM });
  };

  const handleView = (): void => {
    dispatch({ type: ActionTypes.TOGGLE_DETAILS });
  };

  const handleShowNutritionName = () => {
    dispatch({ type: ActionTypes.TOGGLE_NUTRITION_OPEN });
  };

  const handleCheckbox = (name: string): void => {
    dispatch({ type: ActionTypes.TOGGLE_NUTRITION, payload: name });
  };

  const handleLog = () => {
    dispatch({ type: ActionTypes.LOG_INPUT_DATA });
  };

  const handleDeleteAll = () => {
    dispatch({ type: ActionTypes.DELETE_ALL });
  };

  return (
    <div className="body_table_manager">
      <table className="table_table_manager">
        <thead className="head">
          <tr>
            <th></th>
            {Object.keys(state.formData).map((key) => (
              <th key={key}>{key.toUpperCase()}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.inputData.map((item, i) => (
            <tr key={item.MaxInTake}>
              <td>
                <input
                  className="input_table_manager"
                  type="checkbox"
                  checked={state.checkedIndices.includes(i)}
                  onChange={() => handleCheckboxChange(i)}
                />
              </td>
              <td>{item.Id}</td>
              <td>{item.Name}</td>
              <td>{item.Description}</td>
              <td>
                <a href={item.Link} target="_blank" rel="noreferrer">
                  {item.Link}
                </a>
              </td>
              <td>{item.ShouldCook}</td>
              <td>{item.MaxInTake}</td>
              <td>{item.Nutrition.join(", ")}</td>
              <td>
                <button
                  className="button_table_manager"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tbody>
          <tr>
            <td></td>
            <td>{state.formData.Id}</td>
            <td>
              <input
                className="input_table_manager"
                type="text"
                name="Name"
                value={state.formData.Name}
                onChange={handleInputChange}
                placeholder="Enter the Name"
              />
            </td>
            <td>
              <input
                className="input_table_manager"
                type="text"
                name="Description"
                value={state.formData.Description}
                onChange={handleInputChange}
                placeholder="Enter Your Description"
              />
            </td>
            <td>
              <input
                className="input_table_manager"
                type="link"
                name="Link"
                value={state.formData.Link}
                onChange={handleInputChange}
                placeholder="Enter the Link"
              />
            </td>

            <td>
              <label>
                <input
                  className="input_table_manager"
                  type="radio"
                  name="ShouldCook"
                  value="Yes"
                  checked={state.formData.ShouldCook === "Yes"}
                  onChange={handleInputChange}
                />
                Yes
              </label>
              <label>
                <input
                  className="input_table_manager"
                  type="radio"
                  name="ShouldCook"
                  value="No"
                  checked={state.formData.ShouldCook === "No"}
                  onChange={handleInputChange}
                />
                No
              </label>
            </td>
            <td>
              <input
                className="input_table_manager"
                name="MaxInTake"
                value={state.formData.MaxInTake}
                onChange={handleInputChange}
                placeholder="Enter the Max.Intake Per Day"
              />
            </td>
            <td>
              <input
                className="input_table_manager"
                type="text"
                name="Nutrition"
                value={state.clickedNutritions.join(", ")}
                onClick={handleShowNutritionName}
                placeholder="Select Your Nutritions"
                readOnly
              />
              {state.isNutritionOpen && (
                <div>
                  {NutritionData.map((option, i) => (
                    <div key={i} className="span_table_manager">
                      <input
                        className="input_table_manager"
                        type="checkbox"
                        checked={state.clickedNutritions.includes(option)}
                        onChange={() => handleCheckbox(option)}
                      />
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </td>

            <td>
              <button className="button_table_manager" onClick={handleSubmit}>
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="footer">
        <button className="button_table_manager" onClick={handleView}>
          Details
        </button>
        <button className="button_table_manager" onClick={handleLog}>
          Log
        </button>
        <button className="button_table_manager" onClick={handleDeleteAll}>
          Delete
        </button>
      </div>
      {state.isOpenDetails &&
        state.inputData
          .filter((item, index) => state.checkedIndices.includes(index))
          .map((item, i) => (
            <table className="table_table_manager" key={i}>
              <thead>
                <tr>Details </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Name:</strong>
                  </td>
                  <td>{item.Name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Description:</strong>
                  </td>
                  <td className="text">{item.Description}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Link:</strong>
                  </td>
                  <td className="text">{item.Link}</td>
                </tr>
                <tr>
                  <td>
                    <strong>MaxInTake:</strong>
                  </td>
                  <td className="text">{item.MaxInTake}</td>
                </tr>
                <tr>
                  <td>
                    <strong>ShouldCook:</strong>
                  </td>
                  <td className="text">{item.ShouldCook}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Nutrition:</strong>
                  </td>
                  <td className="text">{item.Nutrition.join(", ")}</td>
                  <td>
                    <a href={item.Link} target="_blank" rel="noreferrer">
                      <button className="button_table_manager">
                        Learn More
                      </button>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
    </div>
  );
}

export default TaskManager;
