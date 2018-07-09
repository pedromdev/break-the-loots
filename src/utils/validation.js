import FieldError from './field_error';

const currentDate = new Date();
const variablesSizes = {
  count: 3,
  date: currentDate.toLocaleDateString().length,
  time: currentDate.toLocaleTimeString().length,
  datetime: currentDate.toLocaleString().length	
};

export const exceedLimitOfCharacters = (message) => {
  var additionalLength = 0;
  var regexp = /\{(count|date|time|datetime)\}/g;
  var auxMessage = message.replace(regexp, function(match, string) {
    additionalLength += variablesSizes[string];
    return "";
  });
  
  return (auxMessage.length + additionalLength) > 140;
}

export const isValidMessage = async (message) => {
  let regexp = /\{(count|time|datetime)\}/g;

  if (!regexp.test(message)) {
    throw new FieldError('You must add at least one of these variables: {count}, {time}, {datetime}', 'message');
  } else if (exceedLimitOfCharacters(message)) {
    throw new FieldError('This message must have less than 140 characters', 'message');
  }
};

export const isValidNickname = async (nickname) => {
  if (nickname.length < 3) {
    throw new FieldError('Nickname is too short', 'nickname');
  } else if(nickname.length > 25) {
    throw new FieldError('Nickname is too long', 'nickname');
  } else if (!(/^[a-z0-9_]{3,25}$/i).test(nickname)) {
    throw new FieldError('Nickname must only contain alphanumeric characters', 'nickname');
  }
};