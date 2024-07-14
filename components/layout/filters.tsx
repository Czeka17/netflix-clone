import { FiltersProps } from "../../lib/types";
function Filters({ applyFilters,sortByvoteAverage }:FiltersProps){
  
    return <div className="w-full max-w-[1400px] p-2">
        <div className="flex">
            <div className="m-2">
                <select className="p-2 bg-customColor border-solid border-red-700 border-[1px] rounded"  onChange={(event) => applyFilters(parseInt(event.target.value))}>
                    <option value={0}>Type</option>
                    <option value={28}>Action</option>
                    <option value={16}>Animation</option>
                    <option value={35}>Comedy</option>
                    <option value={18}>Drama</option>
                    <option value={27}>Horror</option>
                    <option value={14}>Fantasy</option>
                </select>
            </div>
            <div className="m-2">
                <select className="p-2 bg-customColor border-solid border-red-700 border-[1px] rounded" onChange={(event) => sortByvoteAverage(event.target.value)}>
                    <option value=''>vote average</option>
                    <option value="ascending">ascending</option>
                    <option value="descending">descending</option>
                </select>
            </div>
        </div>
    </div>
}
export default Filters;