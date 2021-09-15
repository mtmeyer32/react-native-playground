const remoteDefaultState = { rawLocations: [], status: [] };

export const remoteReducer = (state = remoteDefaultState, action) => {
    switch (action.type) {
        case "GET_LOCATIONS":
            // console.log("In reducer");
            // console.log(action.locations);
            let tvs = action.locations.map(tv => {
                let rObj = (({ clientAddr, locationName, status }) => ({ clientAddr, locationName, status }))(tv);
                return rObj;
            })
            return { ...state, rawLocations: action.locations, status: tvs }
        case "GET_TUNED":
            console.log("Get TUNED");
            console.log(action);
            return state;
        default:
            return state;
    }
}