import {handleExpress} from "../utility/handleExperess";
import {loginMiddleware} from "../utility/login.middleware";
import {Request, Response, Router} from "express";
import {UserService} from "../modules/user/user.service";
import {CloseFriendsService} from "../modules/closefriends/closeFriends.service";
import {createHttpResponse} from "../utility/createHttpResponse";
import {userIdDto} from "../modules/user/dto/userIdDto";

export const makeCloseFriendsRoute = (
    closeFriendsService: CloseFriendsService,
    userService: UserService
) => {
    const app = Router();
    const getAllCloseFriendsHandler = async (req: Request, res: Response) => {
        const loggedInUser = req.user.id;
        handleExpress(res, async () =>
            createHttpResponse(req, await closeFriendsService.getAllCloseFriends(loggedInUser), "All allowed user in close friends list")
        );
    };
    const addCloseFriendHandler = async (req: Request, res: Response) => {
        const loggedInUser = req.user.id;
        const closeFriendId = userIdDto.parse({userId: req.params.closeFriendId}).userId;
        handleExpress(res, async () =>
            createHttpResponse(req, await closeFriendsService.setCloseFriend(loggedInUser, closeFriendId), "Added close friend")
        );
    };
    const removeCloseFriendHandler = async (req: Request, res: Response) => {
        const loggedInUser = req.user.id;
        const closeFriendId = userIdDto.parse({userId: req.params.closeFriendId}).userId;
        handleExpress(res, async () =>
            createHttpResponse(req, await closeFriendsService.removeCloseFriend(loggedInUser, closeFriendId), "Removed close friend")
        );
    };
    const isCloseFriendHandler = async (req: Request, res: Response) => {
        const loggedInUser = req.user.id;
        const closeFriendId = userIdDto.parse({userId: req.params.closeFriendId}).userId;
        handleExpress(res, async () =>
            createHttpResponse(req, await closeFriendsService.isCloseFriend(loggedInUser, closeFriendId), "Is close friend")
        );
    };
    app.get("/api/closeFriends", loginMiddleware(userService), getAllCloseFriendsHandler)
    app.post("/api/closeFriends/:closeFriendId", loginMiddleware(userService), addCloseFriendHandler)
    app.delete("/api/closeFriends/:closeFriendId", loginMiddleware(userService), removeCloseFriendHandler)
    app.get("/api/closeFriends/:closeFriendId", loginMiddleware(userService), isCloseFriendHandler)

    return app
}