export function getColorsByProvider (provider: string) {
  if (provider === 'GITHUB') return {
    bg: 'rgba(22,22,22,.5)',
    border: 'rgb(22,22,22)',
    shadow: 'rgba(22,22,22,.3)'
  }
  if (provider === 'INSTAGRAM') return
  if (provider === 'GOOGLE') return
}