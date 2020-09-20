import MaePaySohAPI from '../../gateway/api';

export default async function (req, res) {
  try {
    const {
      page,
    } = req.query;

    const api = new MaePaySohAPI(req.cookies.token);

    const response = await api.getNews({ page });
    const { data, pagination } = response.data;

    return res.status(200).send({ data, pagination });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
}