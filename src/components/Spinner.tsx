import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
  borderColor: '#000',
};

interface SpinnerLoading {
  loading: boolean;
}

const Spinner = ({ loading }: SpinnerLoading) => {
  return <ClipLoader color="#000" loading={loading} cssOverride={override} />;
};

export default Spinner;
