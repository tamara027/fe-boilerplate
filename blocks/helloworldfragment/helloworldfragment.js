import AEMHeadless from 'https://cdn.skypack.dev/@adobe/aem-headless-client-js@v3.4.1';

const AEM_HOST = 'https://author-p139364-e1423304.adobeaemcloud.com';
const AEM_GRAPHQL_ENDPOINT = 'TestFragmentModels';

const aemHeadlessClient = new AEMHeadless({
  serviceURL: AEM_HOST,
});

async function loadData(path) {
  console.log('load data');
  const persistedQueryData = await aemHeadlessClient.runPersistedQuery(`${AEM_GRAPHQL_ENDPOINT}/testModelByPath`, { path });
  console.log('persistedQueryData', persistedQueryData);
  return persistedQueryData.data.testmodelByPath.item.testproperty;
}

console.log('hello-world-fragment');
export default async function decorate(block) {
  console.log('hello-world-fragment decorate', block);

  const anchorElement = block.querySelector('a');
  const contentFragmentPath = anchorElement.textContent;

  try {
    const result = await loadData(contentFragmentPath);
    block.textContent = result;
  } catch (e) {
    console.error('error persisted query', e);
  }
}
