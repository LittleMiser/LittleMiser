//
//  TableViewController.h
//  FeedsAPP
//
//  Created by student on 2019/5/18.
//  Copyright © 2019 iosGroup. All rights reserved.
//

#ifndef TableViewController_h
#define TableViewController_h
#import <UIKit/UIKit.h>

@interface TableViewController : UIViewController<UITableViewDataSource,UITableViewDelegate>{
    
}

@property (nonatomic,retain) UITableView *tableView;

@end
#endif /* TableViewController_h */
