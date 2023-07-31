import { useState } from 'react'

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)
  const [appVersion] = useState(window.electron.process.env.npm_package_version)
  console.log('versions', appVersion)

  return (
    <ul className="versions">
      <li className="app-version">La Estación Sistema de Inventarios v{appVersion}</li>
      <li className="electron-version">Electron v{versions.electron}</li>
      {/* <li className="chrome-version">Chromium v{versions.chrome}</li> */}
      <li className="node-version">Node v{versions.node}</li>
      {/* <li className="v8-version">V8 v{versions.v8}</li> */}
    </ul>
  )
}

export default Versions
