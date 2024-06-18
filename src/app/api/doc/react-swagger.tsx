// src/components/react-swagger.tsx

'use client';

import React, { useEffect, useState } from 'react';
import 'swagger-ui-react/swagger-ui.css';

type Props = {
  spec: Record<string, any>;
};

function ReactSwagger({ spec }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const SwaggerUI = require('swagger-ui-react').default;

  return <SwaggerUI spec={spec} />;
}

export default ReactSwagger;
