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

export const initTVs = (ip) => {
  return (dispatch, getState) => {
    return dispatch(getLocations(ip)).then(() => {
      const tvs = getState().remote.status;
      for (const tv of tvs) {
        console.log("tv: " + tv.clientAddr);
        dispatch(processKey(ip, "poweron", "keyPress", tv.clientAddr)).then(() => {
          return dispatch(getTuned(ip, tv.clientAddr))
        })
      };
      console.log("initTVs");
      console.log(getState().remote.status);
    })
  }
}

export const getLocations = (ip) => {
  return dispatch => {
    return fetch("http://" + ip + ":8080/info/getLocations?type=1")
      .then((response) => response.json())
      .then((json) => {
        return json.locations.map((location) => {
          location['clientAddr'] = location['clientAddr'].toUpperCase();
          return location;
        });
      }).then((response) => {
        dispatch(_getLocations(response));
      })
  };

};

export const getTuned = (ip, clientAddr) => {
  return dispatch => {
    //console.log("getTuned fetch");
    return fetch("http://" + ip + ":8080/tv/getTuned?clientAddr=" + clientAddr)
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
  return dispatch => {
    // console.log("processKey fetch");
    return fetch("http://" + ip + ":8080/remote/processKey?key=" + key + "&hold=" + hold + "&clientAddr=" + clientAddr)
      .then((response) => response.json())
      .then((response) => {
        dispatch(_processKey(response));
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export const tune = (ip, chan, clientAddr) => {
  return async (dispatch) => {
    //console.log("tune fetch");
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
