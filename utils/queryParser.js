const addToFilters = (data, query, varType, fieldN) => {
    /**
     * varType
     * 0->string
     * 1->int
     */
    if (
      (data === "null" ||
        data === "undefined" ||
        data === undefined ||
        data === null ||
        Number.isNaN(data) ||
        data === "") &&
      varType != 10
    )
      return query;
    if (varType == 0) query.push({ [fieldN]: data });
    else if (varType == 1) query.push({ [fieldN]: parseFloat(data) });
    else if (varType == 2) query.push({ [fieldN]: ObjectId(data) });
    return query;
  };
const getFilter = filter => {
    if(filter.length>0)
    return {$and:filter}
return {} 

}
module.exports = {
  addToFilters,
    getFilter
}