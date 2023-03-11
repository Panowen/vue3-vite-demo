export function getImageUrl(key, config = 'x-oss-process=image/resize,m_mfit,w_300,h_300/crop,w_300,h_300,g_center') {
  if (key) {
    return `${ALI_OSS.URL.image}/${key}?${config}`;
  }
}

export function getWholeImageUrl(key) {
  if (key) {
    return `${ALI_OSS.URL.image}/${key}`;
  }
}
