
interface FiltersProps{
    applyFilters:(selectedType:number) => void
    sortByvoteAverage:(selectedDirection:string) => void
}
function Filters({ applyFilters,sortByvoteAverage }:FiltersProps){

    const handleDirectionChange =(event:any) =>{
       const selectedDirection = event.target.value;
       sortByvoteAverage(selectedDirection)
    }

    const handleTypeChange = (event:any) => {
      const selectedType = event.target.value;
      applyFilters(parseInt(selectedType))
    };
  
    return <div className="w-full max-w-[1400px] p-2">
        <div className="flex">
            <div className="m-2">
                <select className="p-2 bg-customColor border-solid border-red-700 border-[1px]" onChange={handleTypeChange}>
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
                <select className="p-2 bg-customColor border-solid border-red-700 border-[1px]" onChange={handleDirectionChange}>
                    <option value=''>vote average</option>
                    <option value="ascending">ascending</option>
                    <option value="descending">descending</option>
                </select>
            </div>
        </div>
    </div>
}
export default Filters;