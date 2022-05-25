import crypto from "../utils/encrypt";
import User from "../api/user/user.model";
import { encode } from "../utils/token.service";

export default class UserService {
  constructor() {}

  public static signup = async (input: any) => {
    const encryptedPassword = await crypto.encrypt(input.password);
    console.log(encryptedPassword);
    return await new User({
      ...input,
      password: encryptedPassword,
    }).save();
  };

  public static signin = async (input: any) => {
    const { email, password } = input;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (await crypto.verify(password, user.password)) {
      let token = {
        token: "",
      };
      token.token = encode({ _id: user._id, email: user.email });

      return { user, token };
    } else {
      throw new Error("Invalid email or password");
    }
  };
}
