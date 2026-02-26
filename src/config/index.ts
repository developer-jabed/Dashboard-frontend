
const baseUrl = import.meta.env.VITE_BASE_URL;

if (!baseUrl && import.meta.env.DEV) {
  console.warn(
    '%c[Config Warning] VITE_BASE_URL is not set in .env → relative URLs may fail',
    'background: #ffcc00; color: black; padding: 4px 8px;'
  );

}

const config = {
  baseUrl: baseUrl || '', 
};

export default config;