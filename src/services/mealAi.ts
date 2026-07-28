const API_BASE_URL =
  'https://api-v2.appdeploy.ai/app/faf6c5ba337b10734f'

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const mealAiApi = {
  post: async (url: string, body: unknown) => {
    const request = async () => {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const error = new Error(
          'Request failed: ' + response.status,
        ) as Error & { status?: number }

        error.status = response.status
        throw error
      }

      return {
        data: await response.json(),
      }
    }

    try {
      return await request()
    } catch (err) {
      const status =
        err instanceof Error && 'status' in err
          ? (err as Error & { status?: number }).status
          : undefined

      if (status !== 502) {
        throw err
      }

      await sleep(800)

      return request()
    }
  },
}
