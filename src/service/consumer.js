import axios from 'axios';

export default {
  async getMember(params) {
    try {
      // const params = { id: 'ae4270ab-eb58-43bc-ec1d-08da84daf8db' };
      const res = await axios.get('/api/member', { params });
      return res.data;
    } catch (err) {
      return err;
    }
  },
  async postMember(params) {
    try {
      // const params = {
      //   name: '',
      //   mobile: '0911111112',
      //   password: 'test2',
      //   registrationTime: '2022-08-24T06:32:51.856Z',
      // };
      const headers = {
        headers: {
          company: '1131906d-03df-4faa-a6c4-dc9e3a1f12a4',
        },
      };
      const res = await axios.post('/api/member', params, headers);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  async putMember(params) {
    try {
      // const params = {
      //   id: '12197b2f-a8ad-448a-3df5-08da86407ef6',
      //   name: 'testtt1',
      //   mobile: '0911111111',
      //   email: 'test1@gmail.com',
      // };
      const headers = {
        headers: {
          company: '1131906d-03df-4faa-a6c4-dc9e3a1f12a4',
        },
      };
      const res = await axios.put('/api/member', params, headers);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  async validateMember(params) {
    try {
      // const params = {
      //   mobile: '0911111111',
      //   companyId: '1131906d-03df-4faa-a6c4-dc9e3a1f12a4',
      // };
      const res = await axios.post('/api/Auth/validate/member', params);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  async memberLogin(params) {
    try {
      // const params = {
      //   mobile: '0911111111',
      //   password: 'test2',
      // };
      const headers = {
        headers: {
          company: '1131906d-03df-4faa-a6c4-dc9e3a1f12a4',
        },
      };
      const res = await axios.post('/api/Auth/login/password', params, headers);
      return res.data;
    } catch (err) {
      return err;
    }
  },
};
