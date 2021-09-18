const remoteDefaultState = { rawLocations: [], status: [] };

export const remoteReducer = (state = remoteDefaultState, action) => {
    switch (action.type) {
        case "GET_LOCATIONS":
            console.log("GET LOCATIONS REDUCER");
            let tvs = action.locations.map(tv => {
                let rObj = (({ clientAddr, locationName, status }) => ({ clientAddr, locationName, status }))(tv);
                return rObj;
            })
            return { ...state, rawLocations: action.locations, status: tvs }
        case "GET_TUNED":
            console.log("GET TUNED REDUCER");
            return {
                ...state,
                status: state.status.map(tv => {
                    if (tv.clientAddr !== action.clientAddr) {
                        return tv;
                    }
                    return {
                        ...tv,
                        zcallsign: action.chan.callsign,
                        zchannel: action.chan.major,
                        ztitle: action.chan.title,
                    }

                })
            }
        default:
            return state;
    }
}