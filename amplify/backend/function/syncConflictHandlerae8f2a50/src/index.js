// This is sample code. Please update this to suite your schema
import { DISCARD } from "@aws-amplify/datastore";


exports.handler = async (data, context, callback) => {
  console.log(data);
  const modelConstructor = data.modelConstructor;
  if (modelConstructor === Post) {
    const remoteModel = data.remoteModel;
    const localModel = data.localModel;
    const newModel = modelConstructor.copyOf(remoteModel, (d) => {
      d.title = localModel.title;
    });
    return newModel;
  }
  return DISCARD   
};
