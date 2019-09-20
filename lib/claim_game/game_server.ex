defmodule ClaimGame.GameServer do
  use GenServer

  alias ClaimGame.Player

  def start_link(state) do
    GenServer.start_link(__MODULE__, state, name: ClaimGame.GameServer)
  end

  def init(_opts) do
    {
      :ok,
      %{
        players: %{}
      }
    }
  end

  @doc """
   Add new player
  """
  def add_player(name, position) do
    GenServer.call(__MODULE__, {:add_player, %Player{name: name, position: position, uuid: UUID.uuid1()}})
  end

  def remove_player(uuid) do
    GenServer.cast(__MODULE__, {:remove_player, uuid})
  end

  def update_player_position(uuid, position) do
    GenServer.cast(__MODULE__, {:update_player_position, uuid, position})
  end

  def get_players() do
    GenServer.call(__MODULE__, :get_players)
  end

  def handle_call({:add_player, player = %Player{}}, _from, state) do
    state = put_in(state, [:players, player.uuid], player)
    {:reply, {:ok, player.uuid}, state}
  end

  def handle_call(:get_players, _from, state) do
    {:reply, {:ok, state.players}, state}
  end

  def handle_call(msg, _from, state) do
    {:reply, :ok, state}
  end

  def handle_cast({:remove_player, uuid}, state) do
    players = Map.delete(state.players, uuid)

    {:noreply, %{state | players: players}}
  end

  def handle_cast({:update_player_position, uuid, position}, state) do
    player = get_in(state, [:players, uuid])
    player = Map.put(player, :position, position)
    state = put_in(state, [:players, uuid], player)

    {:noreply, state}
  end

  def handle_cast(_msg, state) do
    {:noreply, state}
  end
end
