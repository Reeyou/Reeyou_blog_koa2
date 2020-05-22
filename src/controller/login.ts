/* eslint-disable no-undef */
import axios from 'axios'
import ServerResponse from '../common/serverResponse'

export default class Login {
    static async senCode(ctx: any) {
        const uriCode = ctx.request.body.code
        // const clientID = '8f2c841682b05c643d90',
        // clientSecret = 'b3a0be535d3b67b4145dd5decde862408b036bc2'
        const clientID = '310316c9d00ddccc32ef'
        const clientSecret = 'adcfffb9e02749a57653a7881c40350cb9c66143'
        const tokenResponse = await axios({
            method: 'POST',
            url: 'https://github.com/login/oauth/access_token?'
      + `client_id=${clientID}&`
      + `client_secret=${clientSecret}&`
      + `code=${uriCode}`,
            headers: {
                accept: 'application/json',
            },
        })
        logger.silly('tokenResponse: ', tokenResponse)
        const accessToken = tokenResponse.data.access_token
        const result = await axios({
            method: 'get',
            url: 'https://api.github.com/user',
            headers: {
                accept: 'application/json',
                Authorization: `token ${accessToken}`,
            },
        })
        return ServerResponse.SUCCESS(ctx, Constants.MSG_SUCCESS, { result })
    }
}
