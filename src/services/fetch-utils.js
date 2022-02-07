import { client, checkError } from './client';

export async function getBeanieBabies(start, end) {
  const response = await client
    .from('beanie_babies')
    .select()
    .range(start, end);

  return checkError(response);
}

export async function getSingleBeanie(id) {
  const response = await client
    .from('beanie_babies')
    .select()
    .match({ id })
    .single();

  return checkError(response);

}