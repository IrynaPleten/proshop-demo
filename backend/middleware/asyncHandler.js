const asyncHandler = fn => (req, res, error)=> {
	Promise.resolve(fn(req,res,error)).catch(error)
}

export default asyncHandler
