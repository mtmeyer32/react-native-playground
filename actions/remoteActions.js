const _getLocations = (locations) => ({
  type: "GET_LOCATIONS",
  locations,
});

const _getTuned = (chan, clientAddr) => ({
  type: "GET_TUNED",
  chan,
  clientAddr
})

const _processKey = () => ({
  type: "PROCESS_KEY"
})

const _tune = () => ({
  type: "TUNE"
})

export const getLocations = (ip, tuned = false) => {
  return async dispatch => {
    try {
      console.log("getLocations fetch");
      const response = await fetch(
        "http://" + ip + ":8080/info/getLocations?type=1"
      )
        .then((response) => response.json())
        .then((json) => {
          return json.locations.map((location) => {
            location['clientAddr'] = location['clientAddr'].toUpperCase();
            return location;
          });
        })
      dispatch(_getLocations(response));
      if(tuned) {
        response.forEach(tv => {
          dispatch(getTuned(ip, tv.clientAddr));
        });
      }
    }
    catch (error) {
      console.error(error);
    }
  };

};

export const getTuned = (ip, clientAddr) => {
  return async (dispatch) => {
    console.log("getTuned fetch");
    const response = await fetch(
      "http://" + ip + ":8080/tv/getTuned?clientAddr=" + clientAddr
    )
      .then((response) => {
        if (response.status == 200) {
          return response;
        }
        throw new Error("getTuned call returned non 200 response.");
      }
      )
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .then((response) => {
        dispatch(_getTuned(response, clientAddr));
      })
      .catch((error) => {
        console.log(error);
      });

  };
};

export const processKey = (ip, key, hold, clientAddr) => {
  return async (dispatch) => {
    console.log("processKey fetch");
    const response = await fetch(
      "http://" + ip + ":8080/remote/processKey?key=" + key + "&hold=" + hold + "&clientAddr=" + clientAddr
    )
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
    dispatch(_processKey(response));
  }
}

export const tune = (ip, chan, clientAddr) => {
  return async (dispatch) => {
    console.log("tune fetch");
    const response = await fetch(
      "http://" + ip + ":8080/tv/tune?major=" + chan + "&clientAddr=" + clientAddr
    )
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
    dispatch(_tune(response));
  }
}
