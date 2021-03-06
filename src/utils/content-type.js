
export const FORMAT_TYPES = {
  FORMAT_JSON: 'json',
  FORMAT_FORM: 'x-www-form-urlencoded',
  FORMAT_TEXT: 'plain',
  FORMAT_FORM_DATA: 'form-data',
  FORMAT_OCTET_STREAM: 'octet-stream'
};

export const MEDIA_TYPES = {
  MEDIA_APPLICATION: 'application',
  MEDIA_TEXT: 'text'
}

export const CHARSET_UTF8 = 'UTF-8';

export const DEFAULT_CHARSET = CHARSET_UTF8;

export default function createContentType (contentType) {
  if (typeof contentType === 'string') {
    // return stringify(parse(contentType))
    return contentType;
  } else {
    return stringify(contentType);
  }
};

export function parse (contentTypeString) {
  let contentType = {};
  if (!contentTypeString) return contentType;
  let arr = contentTypeString.split(';')
  let [ type, format ] = arr[0].split('/');
  let MIMEType = { type, format };
  let params = arr.slice(1).reduce((d, item) => {
    let a = item.split('=');
    d[a[0]] = a[1];
    return d;
  }, {});

  return { MIMEType, params }
}

export function stringify ({
  MIMEType = {},
  params: {
    charset = DEFAULT_CHARSET,
    ...otherParams
  } = {}
}) {
  let mediasString = `${MIMEType.type}/${MIMEType.format}`;
  let paramsArray = Object.keys(otherParams).map((p) => (`${p}=${otherParams[p]}`));
  return [mediasString, `charset=${charset}`, ...paramsArray].join(';')
}

export function getFormatType (contentType) {
  let ct = parse(contentType);
  return ct.MIMEType && ct.MIMEType.format;
}
