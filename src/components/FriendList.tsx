import React, { useEffect, useState } from 'react';
import { DetailsList, IColumn, PrimaryButton } from '@fluentui/react';
import { addFriend, getAllFriends, deleteFriend, getFriendCount, updateFriend } from '../helper/indexedDB';
import { v4 as uuidv4 } from 'uuid';

export interface Friend {
    id: string;
    name: string;
    phone: string;
}

const FriendList: React.FC = () => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [newFriend, setNewFriend] = useState<Friend>({ id: "", name: "", phone: "" });
    const [action, setAction] = useState<"EDIT" | "DELETE">("EDIT");

    useEffect(() => {
        loadFriends();
    }, []);

    const loadFriends = async () => {
        const friendsData = await getAllFriends();
        const friendCount = await getFriendCount();
        console.log(friendsData);
        // console.log(friendCount);
        setFriends(friendsData);
    };

    const handleAddFriend = async () => {
        if (newFriend.name && newFriend.phone) {
            let newItem = newFriend;
            newItem.id = uuidv4();
            await addFriend(newFriend);
            setNewFriend({ id: "", name: "", phone: "" });
            loadFriends();
        }
    };

    const handleDeleteFriend = async (id: string) => {
        await deleteFriend(id);
        loadFriends();
    };
    const handleEditFriend = async (friend: Friend) => {
        setAction("EDIT")
        setNewFriend(friend);
    };
    const save = async () => {
        await updateFriend(newFriend);
        setNewFriend({ id: "", name: "", phone: "" });
        loadFriends();
    }

    const columns: IColumn[] = [
        { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200 },
        { key: 'phone', name: 'Phone Number', fieldName: 'phone', minWidth: 100, maxWidth: 200 },
        {
            key: 'action',
            name: 'Actions',
            minWidth: 100,
            onRender: (item: Friend) => (<>
                <PrimaryButton text="Delete" onClick={() => handleDeleteFriend(item.id!)} />
                <PrimaryButton text="Edit" onClick={() => handleEditFriend(item!)} />
            </>),
        },
    ];
    return (
        <div>
            <h3>Friend List</h3>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newFriend.name}
                    onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={newFriend.phone}
                    onChange={(e) => setNewFriend({ ...newFriend, phone: e.target.value })}
                />
                <PrimaryButton text={action == "EDIT" ? "Save" : "Add Friend"} onClick={action == "EDIT" ? save : handleAddFriend} />
            </div>
            <DetailsList items={friends} columns={columns} />
        </div>
    );
};

export default FriendList;
