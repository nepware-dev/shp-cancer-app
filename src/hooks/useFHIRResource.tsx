import {useEffect} from 'react';

import FHIR from 'services/fhir';

import usePromise from '@rna/hooks/usePromise';

const useFHIRResource = (resourceType: string, options?: {lazy: boolean}) => {
  const [responseState, loadResource] = usePromise(FHIR.getResource);

  useEffect(() => {
    if (!options?.lazy) {
      loadResource(resourceType);
    }
  }, [resourceType, loadResource, options]);

  return [responseState, loadResource];
};

export default useFHIRResource;
