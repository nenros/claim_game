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

  def handle_in("update_player_position", payload, socket) do
    %{assigns: %{uuid: uuid}} = socket

    ClaimGame.GameServer.update_player_position(uuid, {payload["x"], payload["y"]})
    {:noreply, socket}
  end


  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
