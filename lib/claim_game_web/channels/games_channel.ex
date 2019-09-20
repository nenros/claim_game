defmodule ClaimGameWeb.GamesChannel do
  use ClaimGameWeb, :channel

  def join("games:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, uuid} = ClaimGame.GameServer.add_player(payload["name"], {0,0})
      {:ok, %{uuid: uuid}, assign(socket, :uuid, uuid)}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def terminate({:shutdown, reason}, %{assigns: %{uuid: uuid}}) do
    ClaimGame.GameServer.remove_player(uuid)
  end

  def handle_in("game_data", _payload, socket) do
    {:ok, players} = ClaimGame.GameServer.get_players()
    {:reply, {:ok, players}, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (games:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
