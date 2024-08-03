import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { FollowersInfo } from "@/lib/types";

export async function GET(req: Request,
     {params: {userId}} : {params: {userId: string}}) 
     {
        try {
            const {user: loggedUser} = await validateRequest()

            if(!loggedUser) {
                return new Response("Unauthorized", {status: 401})
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    followers: {
                        where: {
                            followerId: loggedUser.id
                        },
                        select: {
                            followerId: true
                        }
                    },
                    _count: {
                        select: {
                            followers: true,
                            
                        }
                    }
                }
            })

            if(!user) {
                return new Response("User not found", {status: 404})
            }

            const data: FollowersInfo = {
                followers: user._count.followers,
                isFollowingByUser: !!user.followers.length
            }
            return Response.json(data)

        } catch (error) {
            console.error(error);
            return new Response("Error", {status: 500});
        }
}


export async function POST(
    req: Request,
    {params: {userId}} : {params: {userId: string}}
) {
    try {
        const { user: loggedUser } = await validateRequest();

        if(!loggedUser) {
            return new Response("Unauthorized", {status: 401})
        }

        await prisma.follow.upsert({
            where: {
                followerId_followingId: {
                    followerId: loggedUser.id,
                    followingId: userId,
                }
            },
            create: {
                followerId: loggedUser.id,
                followingId: userId,
            },
            update: {},
        })

        return new Response()
        
    } catch (error) {
        console.error(error);
        return new Response("Error", {status: 500});
    }
}

export async function DELETE(
    req: Request,
    {params: {userId}} : {params: {userId: string}}
) {
    try {
        const { user: loggedUser } = await validateRequest();

        if(!loggedUser) {
            return new Response("Unauthorized", {status: 401})
        }

        await prisma.follow.deleteMany({
            where: {
                followerId: loggedUser.id,
                followingId: userId,
                }
        })

        return new Response()

    } catch (error) {
        console.error(error);
        return new Response("Error", {status: 500});
    }
}