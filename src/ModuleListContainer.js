import React, { useEffect, useState } from 'react'
import { ModuleFilter } from './ModuleFilter'
import { ModuleList } from './ModuleList'

export const ModuleListContainer = () => {

  const [makers, setMakers] = useState([]);
  const [modules, setModules] = useState([]);
  const [makersLoading, setMakersLoading] = useState(true);
  const [modulesLoading, setModulesLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/data/makers.json")
    .then((response) => response.json())
    .then((data) => {
      setMakers(data);
      setMakersLoading(false);
    })
    .catch((error) => setError(true))
  }, []);

  useEffect(() => {
    fetch("/data/modules.json")
    .then((response) => response.json())
    .then((data) => {
      setModules(data);
      setModulesLoading(false);
    })
    .catch((error) => setError(true))
  }, []);

  if (!modulesLoading && !makersLoading && !error) {
    return (
      <>
        <ModuleFilter makers={makers} modules={modules} />
        <ModuleList makers={makers} modules={modules} />
      </>
    )
  } else if (error) {
    return (
      <h5>Something went wrong</h5>
    )
  } else {
    return <h5>Loading...</h5>
  }
}