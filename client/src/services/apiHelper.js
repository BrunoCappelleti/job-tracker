import axios from 'axios';

//need to update this to process.env
const BASEURL = 'http://localhost:3004';

const api = axios.create({
  baseURL: BASEURL,
  headers: {
    authorization: localStorage.getItem('trackrToken') ? `Bearer ${localStorage.getItem('trackrToken')}` : null,
  }
});

const updateToken = (token) => {
  localStorage.setItem('trackrToken', token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
};

/////////////////////////////////////////
//User Section
/////////////////////////////////////////

const registerUser = async (userData) => {
  try {
    const resp = await api.post('/users', userData);
    const { data } = resp;
    updateToken(data.token)
    return data;
  } catch(e) {
    console.log(e);
    return false;
  }
};

const loginUser = async (loginData) => {
  try {
    const resp = await api.post('/users/login', loginData)
    const { data } = resp;
    updateToken(data.token);
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/////////////////////////////////////////
//Jobs Section
/////////////////////////////////////////

const createJob = async (userId, jobData) => {
  try {
    const resp = await api.post(`/users/${userId}/jobs`, jobData)
    return resp.data;
  } catch(e) {
    console.log(e);
    return false;
  }
};

const getJobs = async (userId) => {
  try {
    const resp = await api(`/users/${userId}/jobs`)
    return resp.data;
  } catch(e) {
    console.log(e);
    return false;
  }
};

const updateJob = async (userId, jobId, data) => {
  try {
    const resp = await api.put(`/users/${userId}/jobs/${jobId}`, data);
    return resp.data.job;
  } catch(e) {
    console.log(e);
    return false;
  }
};

const deleteJob = async (userId, jobId) => {
  try {
    const resp = await api.delete(`/users/${userId}/jobs/${jobId}`);
    return resp.data.message;
  } catch(e) {
    console.log(e);
    return false
  }
};

/////////////////////////////////////////
//Notes Section
/////////////////////////////////////////

const getNotes = async (userId, jobId) => {
  try {
    const resp = await api(`/users/${userId}/jobs/${jobId}/notes`);
    return resp.data
  } catch(e) {
    console.log(e);
    return false;
  }
};

export {
  registerUser,
  loginUser,
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  getNotes,
}
