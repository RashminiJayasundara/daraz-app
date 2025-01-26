import React,{useState} from 'react'

export interface option{
    id:string;
    name:string;
}
interface DropDownProps {
    onSelect: (value: string) => void;
    options: option[];
  }
const DropDown:React.FC<DropDownProps>=({options,onSelect})=> {
    const[item,setItem]=useState("");
    const handleSelectChange =(event: React.ChangeEvent<HTMLSelectElement>)=>{
        const selectedValue = event.target.value;
        setItem(selectedValue);
        onSelect(selectedValue);
    }
  return (
    <div>
        <select value={item} onChange={handleSelectChange}>
        {options.map((option)=>(
            <option key={option.id} value={option.id}>{option.name}</option>
        ))}
        </select>
    </div>
  )
}

export default DropDown