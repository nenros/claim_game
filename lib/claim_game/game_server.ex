defmodule ClaimGame.GameServer do
  use GenServer

  def start_link(state) do
    GenServer.start_link(__MODULE__, state, name: ClaimGame.GameServer)
  end

  def init(_opts) do
    {
      :ok,
      %{
        players: []
      }
    }
  end

  @doc """
   Add new player
  """
  def add_player() do

  end

  def remove_player() do

  end

  def update_player_position() do

  end

  def get_players() do

  end

  def handle_call(_msg, _from, state) do
    {:reply, :ok, state}
  end

  def handle_cast(_msg, state) do
    {:noreply, state}
  end
end
