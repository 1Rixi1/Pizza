import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"

  >
    <circle cx="135" cy="134" r="125" />
    <rect x="0" y="275" rx="10" ry="10" width="280" height="28" />
    <rect x="-1" y="334" rx="15" ry="15" width="280" height="86" />
    <rect x="-1" y="449" rx="10" ry="10" width="90" height="27" />
    <rect x="122" y="436" rx="25" ry="25" width="154" height="46" />
  </ContentLoader>
)

export default Skeleton

