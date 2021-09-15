const _getLocations = (locations) => ({
  type: "GET_LOCATIONS",
  locations,
});

const _getTuned = (chan) => ({
  type: "GET_TUNED",
  chan,
})

export const getLocations = (ip) => {
  return async (dispatch) => {
    const response = await fetch(
      "http://" + ip + ":8080/info/getLocations?type=1"
    )
      .then((response) => response.json())
      .then((json) => {
        return json.locations;
      })
      .catch((error) => {
        console.error(error);
      });
    dispatch(_getLocations(response));
  };
};

export const getTuned = (ip, clientAddr) => {
  return async (dispatch) => {
    const response = await fetch(
      "http://" + ip + ":8080/tv/getTuned?clientAddr=" + clientAddr
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        return json.title;
      })
      .catch((error) => {
        console.error(error);
      });
    dispatch(_getTuned(response));
  };
};
